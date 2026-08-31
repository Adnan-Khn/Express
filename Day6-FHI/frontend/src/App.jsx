import axios from "axios";
import { useForm } from "react-hook-form";

const FormHandling = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const submitHandler = async (data) => {
    console.log("Data:",data);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("age", data.age);
    //for single file
    //formData.append("image", data.image);
    //for multiple file
    for(let image of data.images){
      //console.log("image : ",image)
      formData.append("images",image)
    }
   //console.log("Formdata : ", formData);
    try {
      await axios.post("http://localhost:3000/user/create", formData);
    } catch (error) {
      console.log("Error in App.jsx : ", error)
    }
    
    //reset();
  };

  return (
    <div className="min-h-screen bg-black px-6 py-12 text-white">
      <div className="mx-auto max-w-lg rounded-2xl border border-gray-800 bg-gray-950 p-8">
        <h2 className="mb-2 text-2xl font-bold">Form Handling Integration</h2>

        <p className="mb-8 text-sm text-gray-400">Fill in the details below.</p>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Name
            </label>

            <input
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name should contain at least 3 characters",
                },
                pattern: {
                  value: /^[A-Za-z ]+$/,
                  message: "Name should contain only letters",
                },
              })}
              type="text"
              placeholder="Enter name"
              className={`w-full rounded-lg border bg-gray-900 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:ring-1 ${
                errors.name
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-700 focus:border-blue-500 focus:ring-blue-500"
              }`}
            />

            {errors.name && (
              <p className="mt-1.5 text-sm text-red-400">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Age */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Age
            </label>

            <input
              {...register("age", {
                required: "Age is required",
                valueAsNumber: true,
                min: {
                  value: 18,
                  message: "Age must be at least 18",
                },
                max: {
                  value: 100,
                  message: "Age must be less than 100",
                },
                validate: (value) => !isNaN(value) || "Age must be a number",
              })}
              type="number"
              placeholder="Enter age"
              className={`w-full rounded-lg border bg-gray-900 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:ring-1 ${
                errors.age
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-700 focus:border-blue-500 focus:ring-blue-500"
              }`}
            />

            {errors.age && (
              <p className="mt-1.5 text-sm text-red-400">
                {errors.age.message}
              </p>
            )}
          </div>

          {/* Profile Picture */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Select Images
            </label>

            <input
              {...register("images", {
                required: "Profile picture is required",
              })}
              type="file"
              multiple
              className={`w-full cursor-pointer rounded-lg border bg-gray-900 px-4 py-3 text-sm text-gray-400 file:mr-4 file:rounded-md file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-blue-700 ${
                errors.images ? "border-red-500" : "border-gray-700"
              }`}
            />

            {errors.images && (
              <p className="mt-1.5 text-sm text-red-400">
                {errors.images.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700 active:scale-[0.98]"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormHandling;
