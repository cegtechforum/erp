import ItemRow from "./ItemRow";

const ItemTable = ({ items, query, getItems }) => {
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="overflow-hidden rounded-lg border border-gray-300 shadow-md">
      <div className="bg-gray-100 text-lg font-semibold text-gray-700">
        <div className="grid grid-cols-4 gap-4 px-6 py-3">
          <div className="text-center">S.No</div>
          <div className="text-center">Item Name</div>
          <div className="text-center">Count</div>
          <div className="text-center">Options</div>
        </div>
      </div>
      <div>
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <ItemRow
              key={index}
              item={{ index, ...item }}
              getItems={getItems}
            />
          ))
        ) : (
          <div className="py-6 text-center text-gray-500">No Item Found</div>
        )}
      </div>
    </div>
  );
};

export default ItemTable;
