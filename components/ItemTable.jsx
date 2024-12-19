import ItemRow from "./ItemRow";

const ItemTable = ({ items, query, getItems }) => {
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="overflow-auto rounded-xl">
      <table className="text-md w-full border-collapse border border-slate-700 bg-gray-200 shadow-lg">
        <thead className="bg-gray-400 text-lg">
          <tr>
            <th className="w-1/6 border border-slate-800 px-4 py-2 font-bold">
              S.No
            </th>
            <th className="w-1/3 border border-slate-800 px-4 py-2 font-bold">
              Item Name
            </th>
            <th className="w-1/5 border border-slate-800 px-4 py-2 font-bold">
              Count
            </th>
            <th className="w-1/3 border border-slate-800 px-4 py-2 font-bold">
              Options
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <ItemRow
                key={index}
                item={{ index, ...item }}
                getItems={getItems}
              />
            ))
          ) : (
            <tr className="text-lg font-semibold">
              <td colSpan="4" className="text-center">
                No Item found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ItemTable;
