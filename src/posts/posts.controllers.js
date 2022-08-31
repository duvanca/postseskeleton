const uuid = require("uuid");
const userControllers = require("../users/users.controllers");

const users = userControllers.userDB
const postsDB = [{
	"id": "uuid",
	"title": "string",
	"content":"string",
	"header_image": "url_to_img",
	"user_id": "74cd6011-7e76-4d6d-b25b-1d6e4182ec2f",//Aqui hara referencia al usuario de tu userDB
	"published": true
}];
  
  const getAllPosts = () => {
    return postsDB;
    //? select * from posts;
  };
  
  const getPostsById = (id) => {
    const data = postsDB.filter((item) => item.id === id);
  
    return data.length ? data[0] : null
    //? select * from users where id = ${id};
  };

  const getPostsMyById = (idUser) => {
    const data = postsDB.filter((post) => post.user_id === idUser);
  
    return data.length ? data : null
    //? select * from users where id = ${id};
  };

  const getPostsByIdUser = (id, idUser) => {
    const postsUser = getPostsMyById(idUser);
    const data = postsUser.filter((post) => post.id === id);
  
    return data.length ? data : null
    //? select * from users where id = ${id};
  };
  
  const createPosts = (data, idUser) => {
    const newPosts = {
      id: uuid.v4(), 
      title: data.title,
      content: data.contet,
      header_image: data.header_image? data.header_image: "",
      user_id: idUser,
      published: true
};
    postsDB.push(newPosts);
    return newPosts;
  };
  
  const editPosts = (id, data,idUser) => {
    const index = postsDB.findIndex((post) => id === post.id);
    if (index !== -1) {
      userDB[index] = {
        id: id,
        title: data.title,
        content: data.contet,
        header_image: data.header_image? data.header_image: "",
        user_id: idUser,
        published: true
        };
      return postsDB[index];
    } else {
      return createPosts(data);
    }
  };
  
  const deletPosts = (id) => {
    const index = postsDB.findIndex(post => post.id === id)
    if (index !== -1) {
      userPosts.splice(index, 1)
      return true
    } else {
      return false
    } 
  }
  
 

  module.exports = {
    getAllPosts,
    getPostsById,
    deletPosts,
    editPosts,
    createPosts,
    getPostsMyById,
    getPostsByIdUser
  }