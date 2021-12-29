import React from "react";

export default function DatatableBerita() {
  return (
    <div className="bg-white p-8 rounded-md w-full">
      <div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-700 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Title Berita
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-700 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-700 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Content
                  </th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
