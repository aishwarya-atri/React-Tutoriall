import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useHistory } from "react-router-dom";

import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { FormControlLabel, Input, Radio, RadioGroup } from "@material-ui/core";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";

function UpdateForm() {
  const { control, handleSubmit } = useForm();
  const [data, setData] = useState([]);
  const history = useHistory();
  const [startDate, setStartDate] = useState("");

  let params = useParams();

  useEffect(() => {
    (async () => {
      const result = await axios(
        "https://react-demo-library.herokuapp.com/db/books/" + params.id
      );
      setData(result.data);

      setStartDate(new Date(result.data["published_date"] + ", 00:00:00"));
    })();
  }, [params.id]);

  const onSubmit = async (data) => {
    let output = {};

    output["book_name"] = data["bookname"];
    output["author"] = data["author"];
    output["published_date"] = startDate.toLocaleString().split(",")[0];
    output["genre"] = data["genre"]["label"];
    output["quantity"] = data["quantity"];
    output["popular"] = data["popular"];
    await axios.put(
      "https://react-demo-library.herokuapp.com/db/books/" + params.id,
      output
    );

    history.push("/lists");
  };

  if (data !== null && data.length !== 0) {
    return (
      <div className="p-lg-4 p-sm-2 p-md-2 m-auto form">
        <div className="text-center pt-4">Form for updating the book!</div>
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
          <span className="published">
            <DatePicker
              id="publisheddate"
              name="publisheddate"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
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
          <div className="pt-4">
            <label htmlFor="popular">Popular</label>
            <Controller
              defaultValue={data["popular"] || "Yes"}
              render={({ field }) => (
                <RadioGroup aria-label="popular" {...field} required>
                  <FormControlLabel
                    value="Yes"
                    id="Yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    id="No"
                    value="No"
                    control={<Radio />}
                    label="No"
                  />
                </RadioGroup>
              )}
              name="popular"
              control={control}
            />
          </div>
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
