import React from "react";

function RoomTable() {
  return (
    <div className="flex min-h-screen justify-center overflow-y-scroll bg-gray-900">
      <div className="col-span-12">
        <div className="overflow-auto lg:overflow-visible">
          <table className="table border-separate space-y-6 text-sm text-gray-400">
            <thead className="bg-gray-800 text-gray-500">
              <tr>
                <th className="rounded-lg p-3">Brand</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-800">
                <td className="rounded-lg p-3">
                  <div className="align-items-center flex">
                    <img
                      className="h-12 w-12 rounded-full object-cover"
                      src="https://images.unsplash.com/photo-1613588718956-c2e80305bf61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80"
                      alt="unsplash image"
                    />
                    <div className="ml-3">
                      <div>Appple</div>
                      <div className="text-gray-500">mail@rgmail.com</div>
                    </div>
                  </div>
                </td>
                <td className="p-3">Technology</td>
                <td className="p-3 font-bold">200.00$</td>
                <td className="p-3">
                  <span className="rounded-md bg-green-400 px-2 text-gray-50">
                    available
                  </span>
                </td>
                <td className="p-3">
                  <a
                    href="#"
                    className="mr-2 text-gray-400 hover:text-gray-100"
                  >
                    <i className="material-icons-outlined text-base">
                      visibility
                    </i>
                  </a>
                  <a
                    href="#"
                    className="mx-2 text-gray-400 hover:text-gray-100"
                  >
                    <i className="material-icons-outlined text-base">edit</i>
                  </a>
                  <a
                    href="#"
                    className="ml-2 text-gray-400 hover:text-gray-100"
                  >
                    <i className="material-icons-round text-base">
                      delete_outline
                    </i>
                  </a>
                </td>
              </tr>
              <tr className="bg-gray-800">
                <td className="rounded-lg p-3">
                  <div className="align-items-center flex">
                    <img
                      className="h-12 w-12 rounded-full object-cover"
                      src="https://images.unsplash.com/photo-1613588718956-c2e80305bf61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80"
                      alt="unsplash image"
                    />
                    <div className="ml-3">
                      <div>Appple</div>
                      <div className="text-gray-500">mail@rgmail.com</div>
                    </div>
                  </div>
                </td>
                <td className="p-3">Technology</td>
                <td className="p-3 font-bold">200.00$</td>
                <td className="p-3">
                  <span className="rounded-md bg-green-400 px-2 text-gray-50">
                    available
                  </span>
                </td>
                <td className="p-3">
                  <a
                    href="#"
                    className="mr-2 text-gray-400 hover:text-gray-100"
                  >
                    <i className="material-icons-outlined text-base">
                      visibility
                    </i>
                  </a>
                  <a
                    href="#"
                    className="mx-2 text-gray-400 hover:text-gray-100"
                  >
                    <i className="material-icons-outlined text-base">edit</i>
                  </a>
                  <a
                    href="#"
                    className="ml-2 text-gray-400 hover:text-gray-100"
                  >
                    <i className="material-icons-round text-base">
                      delete_outline
                    </i>
                  </a>
                </td>
              </tr>
              <tr className="bg-gray-800">
                <td className="rounded-lg p-3">
                  <div className="align-items-center flex">
                    <img
                      className="h-12 w-12 rounded-full object-cover"
                      src="https://images.unsplash.com/photo-1613588718956-c2e80305bf61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80"
                      alt="unsplash image"
                    />
                    <div className="ml-3">
                      <div>Appple</div>
                      <div className="text-gray-500">mail@rgmail.com</div>
                    </div>
                  </div>
                </td>
                <td className="p-3">Technology</td>
                <td className="p-3 font-bold">200.00$</td>
                <td className="p-3">
                  <span className="rounded-md bg-green-400 px-2 text-gray-50">
                    available
                  </span>
                </td>
                <td className="p-3">
                  <a
                    href="#"
                    className="mr-2 text-gray-400 hover:text-gray-100"
                  >
                    <i className="material-icons-outlined text-base">
                      visibility
                    </i>
                  </a>
                  <a
                    href="#"
                    className="mx-2 text-gray-400 hover:text-gray-100"
                  >
                    <i className="material-icons-outlined text-base">edit</i>
                  </a>
                  <a
                    href="#"
                    className="ml-2 text-gray-400 hover:text-gray-100"
                  >
                    <i className="material-icons-round text-base">
                      delete_outline
                    </i>
                  </a>
                </td>
              </tr>
              {/* More rows here */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default RoomTable;
