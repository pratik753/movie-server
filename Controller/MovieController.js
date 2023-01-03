const Movie = require("../Model/MovieSchema");
exports.postData = async (req, res) => {
  const posts = req.body;
  console.log(posts.Quantity);
  try {
    const result = await Movie.create(posts);
    console.log(result);
    res.status(200).json({ data: "successful IAnsertion" });
  } catch (err) {
    console.log(err);
    res.status(409).json({
      status: "Failure in  Insertion",
    });
  }
};
exports.getMovie = async (req, res) => {
  // console.log(req.query);
  // const data = pagination(Movie, req, res);
  console.log(req.query);

  // const page = parseInt(req.query.page) || 1;
  // const pageSize = parseInt(req.query.limit) || 4;
  // const skip = (page - 1) * pageSize;
  // const total = await Post.countDocuments();

  // const pages = Math.ceil(total / pageSize);

  // query = query.skip(skip).limit(pageSize);

  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 4;
  const skip = (page - 1) * limit;
  // const page = parseInt(req.query.page) || 1;
  // const pageSize = parseInt(req.query.limit) || 4;
  // const skip = (page - 1) * pageSize;
  // const pages = Math.ceil(total / pageSize);

  try {
    const tcount = await Movie.countDocuments();
    console.log(tcount);
    let movies = await Movie.find().skip(skip).limit(limit).exec();
    res.status(200).json({
      data: movies,
      count: tcount,
      pageNo: page,
    });
  } catch (error) {
    console.log(error);
    res.status(409).json({
      status: "Failure in  Insertion",
    });
  }
};
exports.getMovieDetail = async (req, res) => {
  try {
    const { movieId } = req.params;
    // console.log(movieId);
    const moviedetail = await Movie.findById(movieId);
    res.status(200).json(moviedetail);
  } catch (error) {
    console.log(error);
    res.status(409).json({
      status: "Failure in  Insertion",
    });
  }
};
exports.searchMovie = async (req, res) => {
  console.log("hi");
  try {
    const { text } = req.params;
    let movies = await Movie.find({
      title: { $regex: `${(text, "")}`, $options: "i" },
    })
      .skip(skip)
      .limit(limit)
      .exec();

    // const text = "Behe";
    // moviedetail = await Movie.find({
    //   title: { $regex: `${text}`, $options: "i" },
    // });
    res.status(200).json({
      data: moviedetail,
    });
    console.log("moviedetail");
  } catch (error) {
    console.log(error);
    res.status(409).json({
      status: "Failure in  Insertion",
    });
  }
};
exports.getFilterMovies = async (req, res) => {
  try {
    const { filterField } = req.params;
    // console.log(filterField);
    const fmoviedetail = await Movie.find({ tags: `${filterField}` });
    // console.log(fmoviedetail);
    res.status(200).json({
      data: fmoviedetail,
    });
  } catch (error) {
    console.log(error);
    res.status(409).json({
      status: "Failure in  Insertion",
    });
  }
};

///////////////////////////
// const pagination = async (model, req, res) => {
//   const page = req.query.page * 1 || 1;
//   const limit = req.query.limit * 1 || 2;
//   const skip = (page - 1) * limit;
//   try {
//     movies = await model.find().limit(limit).skip(page).exec();

//     // results.results = await model.find().limit(limit).skip(startIndex).exec()
//     res.paginatedResults = movies;
//     // res.paginatedResults = movies
//     // console.log(movies);
//     return movies;
//     // req.query = req.query.skip(skip).limit(limit);
//     // return req.query;
//     // next();
//   } catch (error) {
//     console.log(error);
//   }
// };
