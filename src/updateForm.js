import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useHistory } from "react-router-dom";

import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@material-ui/core";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";

function UpdateForm(props) {
  const { control, handleSubmit } = useForm();
  const [data, setData] = useState([]);
  const history = useHistory();
  const [startDate, setStartDate] = useState("");

  let params = useParams();

  useEffect(() => {
    (async () => {
      const result = await axios("https://react-demo-library.herokuapp.com/db/books/" + params.id);
      setData(result.data);

      setStartDate(new Date(result.data["published_date"] + "T00:00:00"));
    })();
  }, [params.id]);

  const onSubmit = async (data) => {
    let output = {};

    output["book_name"] = data["bookname"];
    output["author"] = data["author"];
    output["published_date"] = startDate.toISOString().split("T")[0];
    output["genre"] = data["genre"]["label"];
    output["quantity"] = data["quantity"];
    await axios.put("https://react-demo-library.herokuapp.com/db/books/" + params.id, output);

    history.push("/lists");
  };

  if (data !== null && data.length !== 0) {
    return (
      <div className="p-lg-4 p-sm-2 p-md-2 m-auto form">
        <div className="text-center pt-4">Add book in the library!</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <br />
          <br />
          <label htmlFor="bookname"> Book Name</label>
          <Controller
            render={({ field }) => <Input {...field} required id="bookname" />}
            name="bookname"
            control={control}
            defaultValue={data["book_name"]}
            rules={{ required: true }}
            classNameName="materialUIInput"
          />
          <br />
          <br />
          <label htmlFor="author"> Author</label>
          <Controller
            render={({ field }) => <Input {...field} required id="author" />}
            name="author"
            control={control}
            rules={{ required: true }}
            defaultValue={data["author"]}
            classNameName="materialUIInput"
          />
          <br />
          <br />
          <label htmlFor="publisheddate">Published Date</label>
          <span className='published'>
        <DatePicker
          id="publisheddate"
          name="publisheddate"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selected={startDate} />
          </span>
          <br />
          <br />
          <label htmlFor="quantity">Quantity </label>
          <Controller
            render={({ field }) => (
              <Input {...field} required type="number" id="quantity" />
            )}
            name="quantity"
            control={control}
            rules={{ required: true }}
            defaultValue={data["quantity"]}
            classNameName="materialUIInput"
          />
          <br />
          <br />
          <span className="style">
            Genre
            <Controller
              name="genre"
              defaultValue={{ value: data["genre"], label: data["genre"] }}
              render={({ field }) => (
                <Select
                  {...field}
                  defaultValue={{ value: data["genre"], label: data["genre"] }}
                  options={[
                    { value: "Anime", label: "Anime" },
                    { value: "Comedy", label: "Comedy" },
                    { value: "Drama", label: "Drama" },
                    { value: "Horror", label: "Horror" },
                    { value: "Historic", label: "Historic" },
                    { value: "Mystery", label: "Mystery" },
                    { value: "Romance", label: "Romance" },
                    { value: "Sci-fi", label: "Sci-fi" },
                    { value: "Thriller", label: "Thriller" },
                    { value: "Other", label: "Other" },
                  ]}
                />
              )}
              control={control}
            />
          </span>
          <br />
          <br />
          <br />
          <br />
          <div className="text-center">
            <button type="submit" className="w-50">
              Update
            </button>
          </div>
        </form>
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default UpdateForm;
