CREATE OR REPLACE TRIGGER set_event_status_on_insert_or_update
AFTER INSERT OR UPDATE ON public.lists
FOR EACH ROW
EXECUTE FUNCTION update_event_status();

CREATE OR REPLACE FUNCTION update_event_status()
RETURNS TRIGGER AS $$
BEGIN
    -- Ensure the trigger only executes at the top level
    IF (SELECT pg_trigger_depth()) = 1 THEN
        -- Check if the status of the associated event is not already 'pending'
        IF (SELECT status FROM events WHERE event_id = NEW.event_id) != 'pending' THEN
            UPDATE events
            SET status = 'pending'
            WHERE event_id = NEW.event_id;
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE TRIGGER adjust_items_and_approved_count_on_event_accept
AFTER UPDATE ON public.events
FOR EACH ROW
WHEN ((OLD.status IS DISTINCT FROM NEW.status))
EXECUTE FUNCTION adjust_item_count_and_approved_count();

CREATE OR REPLACE FUNCTION adjust_item_count_and_approved_count()
RETURNS TRIGGER AS $$
DECLARE 
    item_record RECORD;
    available_count INTEGER;
BEGIN
    -- Debugging: Log status change
    RAISE NOTICE 'Old Status: %, New Status: %', OLD.status, NEW.status;

    -- Check if the status is being updated to "accepted"
    IF NEW.status = 'accepted' AND OLD.status != 'accepted' THEN
        -- Loop through each item in the lists table associated with the accepted event
        FOR item_record IN 
            SELECT item_name, count FROM lists WHERE event_id = NEW.event_id
        LOOP
            -- Check if the item exists in the items table
            SELECT count INTO available_count FROM items WHERE name = item_record.item_name;

            IF NOT FOUND THEN
                -- Item does not exist in the inventory; log a warning and skip
                RAISE NOTICE 'Item "%s" does not exist in the inventory. Skipping.', item_record.item_name;
                CONTINUE;
            END IF;

            -- Debugging: Log the availability of items
            RAISE NOTICE 'Item: %, Requested Count: %, Available Count: %', 
                         item_record.item_name, item_record.count, available_count;

            -- Update the items table by reducing the available count
            UPDATE items
            SET count = count - LEAST(item_record.count, available_count) -- Reduce by approved quantity
            WHERE name = item_record.item_name;

            -- Update the lists table with the approved count and remaining count
            UPDATE lists
            SET 
                approved_count = approved_count + LEAST(item_record.count, available_count), -- Approve only available
                count = GREATEST(item_record.count - available_count, 0) -- Set remaining count to unfulfilled
            WHERE 
                event_id = NEW.event_id 
                AND item_name = item_record.item_name;

            -- Debugging: Log item updates after adjustment
            RAISE NOTICE 'Updated item: %, Requested: %, Approved: %, Remaining Count: %', 
                         item_record.item_name, 
                         item_record.count, 
                         LEAST(item_record.count, available_count), 
                         GREATEST(item_record.count - available_count, 0);
        END LOOP;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;








-- Create the function to update timestamps
CREATE OR REPLACE FUNCTION update_event_timestamps()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if the status is changing to 'accepted'
  IF NEW.status = 'accepted' AND OLD.status IS DISTINCT FROM 'accepted' THEN
    NEW.accepted_time := CURRENT_TIMESTAMP;
  END IF;

  -- Check if the status is changing to 'returned'
  IF NEW.status = 'returned' AND OLD.status IS DISTINCT FROM 'returned' THEN
    NEW.returned_time := CURRENT_TIMESTAMP;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger
CREATE TRIGGER trigger_update_event_timestamps
BEFORE UPDATE ON events
FOR EACH ROW
EXECUTE FUNCTION update_event_timestamps();





CREATE OR REPLACE FUNCTION take_monthly_snapshot()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO items_history (name, count, snapshot_date)
  SELECT name, count, DATE_TRUNC('month', CURRENT_DATE)
  FROM items
  ON CONFLICT (name, snapshot_date) DO UPDATE
  SET count = EXCLUDED.count;
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER monthly_items_snapshot
  AFTER INSERT OR UPDATE OR DELETE ON items
  FOR EACH STATEMENT
  EXECUTE FUNCTION take_monthly_snapshot();