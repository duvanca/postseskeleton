const postsControllers = require("./posts.controllers");

const getAll = (req, res) => {
  const data = postsControllers.getAllPosts();
  res.status(200).json({ items: data.length, posts: data });
};

const getById = (req, res) => {
  console.log(req.params.id)
  const id = req.params.id;
  const data = postsControllers.getPostsById(id);

  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({ message: `El posts con el id ${id} no existe` });
  }
};

const getMyById = (req, res) => {
 
  const idUser = req.user.id;
  const data = postsControllers.getPostsMyById(idUser);

  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({ message: `El posts con el id ${id} no existe` });
  }
};

const getMyByIdUser = (req, res) => {
  const id = req.params.id;
  const idUser = req.user.id;
  const data = postsControllers.getPostsByIdUser(id, idUser);

  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({ message: `El posts con el id ${id} no existe` });
  }
}


const createPost = (req, res) => {
  const data = req.body;
  const idUser = req.user.id;
  if (!data) {
    return res.status(400).json({ message: "Missing Data" });
  } else if (
    !data.title ||
    !data.content ||
    !data.published
  ) { 
    return res.status(400).json({
      message: "All fields must be completed",
      fields: {
        title: "string",
        content: "string",
        published: true
      },
    });
  } else {
    const response = userControllers.createPosts(data, idUser);
    return response
      .status(201)
      .json({
        message: `post created succesfully with id: ${response.id}`,
        user: response,
      });
  }
};



const editMyPost = (req, res) => {
  const id = req.params.id;
  const idUser = req.user.id
  const data = req.body;
  if (!Object.keys(data).length) {
    return res.status(400).json({ message: "Missing Data" });
  } else if (
    !data.title ||
    !data.content ||
    !data.header_image ||
    !data.published
    
  ) {
    return res.status(400).json({
      message: "All fields must be completed",
      fields: {
        title: "string",
        content: "string",
        header_image: "example.com/img/example.png",
        published: "boolean"
      },
    });
  } else {
    const response = postsControllers.editPosts(id, data, idUser)
    return res.status(200).json({
      message: 'post edited succesfully',
      post: response
    })
  }
};


const removeMyPost = (req, res) => {
  const id = req.params.id;
  const data = postsControllers.deletPosts(id);

  if (data) {
    return res.status(204).json();
  } else {
    return res.status(400).json({ message: "Invalid ID" });
  }
};




module.exports = {
    getAll,
    getById,
    createPost,
    editMyPost,
    removeMyPost,
    getMyById,
    getMyByIdUser
}