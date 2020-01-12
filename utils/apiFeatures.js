class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    //Filtering
    //shallow copy of query to exclude some fields from queries
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields"];
    //now delete the fields from the original query
    excludedFields.forEach(item => delete queryObj[item]);

    //replace advanced fields with MongoDB operators
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      match => `$${match}`
    );
    //gets data from the query string
    // console.log(req.query);
    // the model with .find() returns the same as the collection with the .find() in the terminal
    // use filter directly with MongoDB
    // let query = Tour.find(JSON.parse(queryString));

    this.query.find(JSON.parse(queryString));

    return this;
  }

  sort() {
    //Sorting
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query.sort = this.query.sort(sortBy);
    } else {
      this.query.sort = this.query.sort("-price");
    }
    return this;
  }

  limit() {
    // Field limiting
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    //limiting results
    if (this.queryString.limit) {
      const limit = this.queryString.limit * 1 || 100;
      this.query.limit(limit);
    }
    return this;
  }

  paginate() {
    //Pagination
    if (this.queryString) {
      //make page value a number
      const page = this.queryString * 1;
      //make limit a number OR have 100 as default
      const limit = this.queryString.limit * 1 || 100;
      const skip = (page - 1) * limit;

      //implement pagination through mongoose
      this.query.skip(skip).limit(limit);
    }
    return this;
  }
}

module.exports = APIfeatures;
