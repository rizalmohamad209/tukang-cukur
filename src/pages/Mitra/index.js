import React from "react";
import Tambahmitra from "../../components/Tambahmitra";
import { useForm } from "react-hook-form";
import {
  postMitra,
  fetchingMitra,
  startFetchingMitra,
} from "../../redux/features/mitra/action";
import { useSelector, useDispatch } from "react-redux";
import Datatable from "../../components/Datatable/index";

export default function Mitra() {
  let dispatch = useDispatch();
  let mitra = useSelector((state) => state.mitras);
  const [modal, setModal] = React.useState(false);
  const [latLong, setLatLong] = React.useState(null);
  const [preview, setPreview] = React.useState(null);
  const [selectedFile, setSelectedFile] = React.useState();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // let newData = {
    //   ...data,
    //   image: data.image[0],
    //   lat: latLong[1],
    //   long: latLong[0],
    // };
    let newImage = data.image[0];
    let lat = latLong[1];
    let long = latLong[0];
    console.log(long, lat, "data lat long");
    let formData = new FormData();
    formData.append("image", newImage);
    formData.append("lat", lat);
    formData.append("long", long);
    formData.append("nama_mitra", data.nama_mitra);
    formData.append("alamat", data.alamat);

    console.log("file upload", formData);
    dispatch(postMitra(formData));
  };

  function handleLatLong(latlong) {
    setLatLong(latlong);
  }
  console.log("ini state mitra", mitra);

  const onSelectFile = (e) => {
    if (e.target.files[0]) {
      console.log("picture: ", e.target.files);
      setSelectedFile(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setPreview(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  React.useEffect(() => {
    dispatch(fetchingMitra());
    dispatch(startFetchingMitra());
  }, [dispatch]);
  // React.useEffect(() => {
  //   if (!selectedFile) {
  //     setPreview("tidak ada");
  //     return;
  //   }

  //   const objectUrl = URL.createObjectURL(selectedFile);
  //   setPreview(objectUrl);

  //   // free memory when ever this component is unmounted
  //   return () => URL.revokeObjectURL(objectUrl);
  // }, [selectedFile]);
  console.log("file selected", selectedFile);

  return (
    <div>
      <div className="px-3 md:px-8 h-auto mt-10  mb-16 ml-64 ">
        <div className="container mx-auto ">
          <div className=" flex items-center justify-between pb-6">
            <div>
              <h2 className="text-gray-600 font-semibold">Data Mitra</h2>
              <span className="text-xs">Seluruh mitra yang beragabung</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex bg-gray-50 items-center p-2 rounded-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  className="bg-gray-50 outline-none ml-1 block "
                  type="text"
                  name
                  id
                  placeholder="search..."
                />
              </div>
              <div className="lg:ml-40 ml-10 space-x-8">
                <button
                  onClick={() => setModal(true)}
                  className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
                >
                  Create
                </button>
              </div>
            </div>
          </div>

          {modal ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                {" "}
                <div className="relative w-2/3 ml-64  top-40 my-6  ">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full px-5 py-5 bg-white outline-none mt-32 focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                      <h3 className="text-3xl font-semibold">Tambah Mitra</h3>
                      <button
                        className="p-1 ml-auto  border-0 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setModal(false)}
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
                    <form encType="multipart/form-data">
                      <div class="md:flex items-center mt-12">
                        <div class="w-full md:w-1/2 flex flex-col">
                          <label class="font-semibold leading-none">
                            Nama Mitra
                          </label>
                          <input
                            {...register("nama_mitra")}
                            class="leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200"
                          />
                        </div>
                        <div class="w-full md:w-1/2 flex flex-col md:ml-6 md:mt-0 mt-4">
                          <label class="font-semibold leading-none">Kota</label>
                          <input
                            {...register("alamat")}
                            class="leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200"
                          />
                        </div>
                      </div>
                      <div class="md:flex items-center mt-8">
                        <div class="w-full flex flex-col">
                          <label class="font-semibold leading-none mb-5">
                            Upload Image
                          </label>
                          <div class="flex items-center justify-center w-full">
                            <label class="flex flex-col w-full h-auto border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                              <div class="flex flex-col items-center justify-center pt-7">
                                {preview === null ? (
                                  <>
                                    {" "}
                                    <img
                                      className="w-24 h-20"
                                      src="https://res.cloudinary.com/dk4dgvu4w/image/upload/v1640608958/upload_hzzrnu.png"
                                      alt=""
                                    />
                                  </>
                                ) : (
                                  <>
                                    <img
                                      src={preview}
                                      alt=""
                                      className="w-24 h-20"
                                    />
                                  </>
                                )}

                                <p class="px-2 py-3 rounded-xl text-sm tracking-wider text-white bg-blue-700  group-hover:text-gray-600">
                                  Choose Image
                                </p>
                              </div>
                              <input
                                type="file"
                                class="opacity-0"
                                {...register("image")}
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
                          <Tambahmitra handleLatLong={handleLatLong} />
                        </div>
                      </div>
                      <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                        <button
                          className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => setModal(false)}
                        >
                          Close
                        </button>

                        <button
                          className="bg-emerald-500 text-black active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => {
                            setModal(false);
                            handleSubmit(onSubmit)();
                          }}
                        >
                          Save Changes
                        </button>
                      </div>
                    </form>
                    {/*footer*/}
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}

          <Datatable data={mitra.data} rowsPerPage={8} />
        </div>
      </div>
    </div>
  );
}
