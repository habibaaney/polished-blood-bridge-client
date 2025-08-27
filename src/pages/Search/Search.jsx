import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FaSearch, FaSpinner } from "react-icons/fa";

const Search = () => {
  const { register, handleSubmit, watch } = useForm();
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  // Load districts and upazilas from JSON files
  useEffect(() => {
    const loadData = async () => {
      try {
        const districtsRes = await fetch("/districts.json");
        const districtsData = await districtsRes.json();
        setDistricts(districtsData[2].data);

        const upazilasRes = await fetch("/upazilas.json");
        const upazilasData = await upazilasRes.json();
        setUpazilas(upazilasData[2].data);
      } catch (error) {
        console.error("Failed to load location data:", error);
      }
    };
    loadData();
  }, []);

  const selectedDistrict = watch("district");

  useEffect(() => {
    if (selectedDistrict && districts.length && upazilas.length) {
      const districtData = districts.find((d) => d.name === selectedDistrict);
      if (districtData) {
        const relevantUpazilas = upazilas.filter(
          (u) => u.district_id === districtData.id
        );
        setFilteredUpazilas(relevantUpazilas);
      } else {
        setFilteredUpazilas([]);
      }
    } else {
      setFilteredUpazilas([]);
    }
  }, [selectedDistrict, districts, upazilas]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    setSearched(true);
    try {
      const res = await axios.get(
        "https://a12-blood-bridge-server.vercel.app/donors/search",
        {
          params: data,
        }
      );
      setSearchResults(res.data);
    } catch (error) {
      console.error("Error searching for donors:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Search for Donors
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Blood Group Selector */}
          <div>
            <label className="label">
              <span className="label-text">Blood Group</span>
            </label>
            <select
              {...register("bloodGroup")}
              className="select select-bordered w-full"
              required
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          {/* District Selector */}
          <div>
            <label className="label">
              <span className="label-text">District</span>
            </label>
            <select
              {...register("district")}
              className="select select-bordered w-full"
              required
            >
              <option value="">Select District</option>
              {districts.map((d) => (
                <option key={d.id} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          {/* Upazila Selector */}
          <div>
            <label className="label">
              <span className="label-text">Upazila</span>
            </label>
            <select
              {...register("upazila")}
              className="select select-bordered w-full"
              disabled={!selectedDistrict}
              required
            >
              <option value="">Select Upazila</option>
              {filteredUpazilas.map((u) => (
                <option key={u.id} value={u.name}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-error text-white w-full"
            disabled={isLoading}
          >
            {isLoading ? <FaSpinner className="animate-spin" /> : <FaSearch />}
            Search
          </button>
        </form>
      </div>

      {/* Search Results Section */}
      <div className="mt-12">
        {isLoading && (
          <div className="text-center">
            <FaSpinner className="animate-spin text-4xl text-red-600 mx-auto" />
          </div>
        )}
        {!isLoading && searched && searchResults.length === 0 && (
          <div className="text-center text-gray-500">
            No donors found matching your criteria.
          </div>
        )}
        {!isLoading && searchResults.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((donor) => (
              <div key={donor._id} className="card bg-base-100 shadow-xl">
                <figure className="px-10 pt-10">
                  <img
                    src={donor.avatar}
                    alt={donor.name}
                    className="rounded-xl h-32 w-32 object-cover"
                  />
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title">{donor.name}</h2>
                  <p>
                    Blood Group:{" "}
                    <span className="font-bold text-red-600">
                      {donor.bloodGroup}
                    </span>
                  </p>
                  <p>
                    {donor.upazila}, {donor.district}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
