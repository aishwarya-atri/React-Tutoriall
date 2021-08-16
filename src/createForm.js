import React, { useState } from "react";
import Select from "react-select";
import { useHistory } from "react-router-dom";

import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { Input, FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import { Button } from "reactstrap";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function CreateForm() {
  const { control, handleSubmit } = useForm();
  const [startDate, setStartDate] = useState(new Date());
  const history = useHistory();

  const onSubmit = async (data) => {
    // check whether book is present, if yes, update quantity

    var get_response = await axios.get(
      "https://react-demo-library.herokuapp.com/db/books?book_name=" +
        data["bookname"]
    );

    let output = {};

    output["book_name"] = data["bookname"];
    output["author"] = data["author"];
    output["published_date"] = startDate.toLocaleString().split(",")[0];
    output["genre"] = data["genre"]["value"];
    output["quantity"] = parseInt(data["quantity"]);
    output["popular"] = data["popular"];

    if (get_response.data.length === 0) {
      // already exists

      await axios.post(
        "https://react-demo-library.herokuapp.com/db/books",
        output
      );
      history.push("/lists");
    } else {
      //update Quantity
      get_response.data[0]["quantity"] =
        get_response.data[0]["quantity"] + output["quantity"];
      if (
        output["book_name"] === get_response.data[0]["book_name"] &&
        output["author"] === get_response.data[0]["author"] &&
        output["published_date"] === get_response.data[0]["published_date"] &&
        output["genre"] === get_response.data[0]["genre"] &&
        output["popular"] === get_response.data[0]["popular"]
      ) {
        // same book

        await axios.put(
          "https://react-demo-library.herokuapp.com/db/books/" +
            get_response.data[0]["id"],
          get_response.data[0]
        );
        history.push("/lists");
      } else {
        // wrong details
        window.alert(
          "The Book already exists in the database with the Author: " +
            get_response.data[0]["author"] +
            " , Publication Date: " +
            get_response.data[0]["published_date"] +
            " ,Genre: " +
            get_response.data[0]["genre"] +
            " . One of these details is entered incorrectly. Please check the details and try again!"
        );
      }
    }
  };

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
          defaultValue=""
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
          defaultValue=""
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
          defaultValue={1}
          classNameName="materialUIInput"
        />
        <br />
        <br />
        <span className="style">
          <label htmlFor="genre">Genre</label>
          <Controller
            name="genre"
            render={({ field }) => (
              <Select
                {...field}
                required
                id="genre"
                inputId="genre"
                rules={{ required: true }}
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
            defaultValue=""
          />
        </span>
        <div className="pt-4">
          <label htmlFor="popular">Popular</label>
          <Controller
            defaultValue="Yes"
            render={({ field }) => (
              <RadioGroup aria-label="popular" {...field}>
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
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
          <Button type="submit" className="w-50">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateForm;
