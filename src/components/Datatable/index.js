import React, { useState } from "react";
import useTable from "../../hooks/useTable";
import MapMitra from "../Tambahmitra";
import TableFooter from "../TableFooter/index";
import { useForm } from "react-hook-form";
import { updateMitra, deleteMitra } from "../../redux/features/mitra/action";
import { useDispatch } from "react-redux";

export default function Datatable({ data, rowsPerPage }) {
  let dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [latLong, setLatLong] = React.useState(null);
  const [detailData, setDetailData] = React.useState(null);
  const onSubmit = (data) => {
    let id = data.id;
    let newImage = data.image[0];
    let lat = latLong[1];
    let long = latLong[0];
    console.log(newImage);
    let formData = new FormData();
    formData.append("image", newImage);
    formData.append("lat", lat);
    formData.append("long", long);
    formData.append("nama_mitra", data.nama_mitra);
    formData.append("alamat", data.alamat);

    console.log("file upload", formData);
    dispatch(updateMitra(id, formData));
    reset();
  };
  function handleLatLong(latlong) {
    setLatLong(latlong);
  }

  const handleEdit = (id) => {
    let dataDetail = slice.filter((data) => data.id === id);
    setDetailData(dataDetail);
  };

  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);
  const [modalEdit, setModalEdit] = React.useState(false);
  const [selectedFile, setselectedFile] = React.useState(null);
  const [preview, setPreview] = React.useState(null);
  const onSelectFile = (e) => {
    if (e.target.files[0]) {
      console.log("picture: ", e.target.files);
      setselectedFile(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setPreview(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  console.log("ini slice", slice);
  return (
    <div className="bg-white p-8 rounded-md w-full">
      <div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-700 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Nama BarberShop
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-700 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Alamat
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-700 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {slice.map((el) => {
                  return (
                    <tr>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {el.nama_mitra}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {el.alamat}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <button
                          className="bg-green-500 px-3 py-2 rounded-md"
                          onClick={() => {
                            setModalEdit(true);
                            handleEdit(el.id);
                          }}
                        >
                          Edit
                        </button>{" "}
                        |{" "}
                        <button
                          className="bg-red-600 px-3 py-2 rounded-md"
                          onClick={() => {
                            dispatch(deleteMitra(el.id));
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <TableFooter
              range={range}
              slice={slice}
              setPage={setPage}
              page={page}
            />
          </div>
        </div>
      </div>
      {modalEdit ? (
        <>
          <div className="justify-center items-center py-5  flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            {" "}
            <div className="relative w-2/3 ml-64  top-40 my-6  ">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full px-5 py-5 bg-white outline-none mt-32 focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Edit Mitra</h3>
                  <button
                    className="p-1 ml-auto  border-0 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setModalEdit(false)}
                  >
                    <span
                      className=" text-red-600  h-6 w-6 text-2xl  block outline-none focus:outline-none"
                      onClick={() => reset()}
                    >
                      X
                    </span>
                  </button>
                </div>
                {/*body*/}
                {detailData.map((itm) => {
                  return (
                    <form encType="multipart/form-data">
                      <div className="md:flex items-center mt-12">
                        <div className="w-full md:w-1/2 flex flex-col">
                          <label className="font-semibold leading-none">
                            Nama Mitra
                          </label>
                          <input
                            {...register("nama_mitra")}
                            defaultValue={itm.nama_mitra}
                            className="leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200"
                          />
                          <input
                            type="hidden"
                            {...register("id")}
                            defaultValue={itm.id}
                            className="leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200"
                          />
                        </div>
                        <div className="w-full md:w-1/2 flex flex-col md:ml-6 md:mt-0 mt-4">
                          <label className="font-semibold leading-none">
                            Kota
                          </label>
                          <input
                            {...register("alamat")}
                            defaultValue={itm.alamat}
                            className="leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200"
                          />
                        </div>
                      </div>
                      <div className="md:flex items-center mt-8">
                        <div className="w-full flex flex-col">
                          <label className="font-semibold leading-none mb-5">
                            Upload Image
                          </label>
                          <div className="flex items-center justify-center w-full">
                            <label className="flex flex-col w-full h-auto border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                              <div className="flex flex-col items-center justify-center pt-7">
                                {preview === null ? (
                                  <>
                                    {" "}
                                    <img
                                      src={itm.image}
                                      alt=""
                                      classNam="w-24 h-20"
                                    />
                                  </>
                                ) : (
                                  <>
                                    <img
                                      className="w-24 h-20"
                                      src={preview}
                                      alt=""
                                    />
                                  </>
                                )}

                                <p class="px-2 py-3 rounded-xl text-sm tracking-wider text-white bg-blue-700  group-hover:text-gray-600">
                                  Choose Image
                                </p>
                              </div>
                              <input
                                {...register("image")}
                                type="file"
                                class="opacity-0"
                                onChange={onSelectFile}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div class="w-full flex flex-col mt-8 ">
                          <label class="font-semibold leading-none mb-5">
                            Alamat
                          </label>
                          <MapMitra
                            dataLat={itm.lat}
                            dataLong={itm.long}
                            type={"update"}
                            handleLatLong={handleLatLong}
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                        <button
                          className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => {
                            setModalEdit(false);
                            reset();
                          }}
                        >
                          Close
                        </button>

                        <button
                          className="bg-emerald-500 text-black active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => {
                            setModalEdit(false);
                            handleSubmit(onSubmit)();
                          }}
                        >
                          Save Changes
                        </button>
                      </div>
                    </form>
                  );
                })}
                {/*footer*/}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
}
