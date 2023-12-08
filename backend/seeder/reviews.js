const ObjectId  = require("mongodb").ObjectId;

const reviews = [
    {
    comment: "Review. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni ipsa ducimus architecto explicabo id accusantium nihil exercitationem autem porro esse.",
    rating: 5,
    user: { id:new ObjectId(), name: "John Doe" },
  },
  {
    comment: "Review. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni ipsa ducimus architecto explicabo id accusantium nihil exercitationem autem porro esse.",
    rating: 5,
    user: { id:new ObjectId(), name: "John Doe" },
  },
  {
    comment: "Review. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni ipsa ducimus architecto explicabo id accusantium nihil exercitationem autem porro esse.",
    rating: 5,
    user: { id: new ObjectId(), name: "John Doe" },
  },
  {
    comment: "Review. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni ipsa ducimus architecto explicabo id accusantium nihil exercitationem autem porro esse.",
    rating: 4,
    user: { id: new ObjectId(), name: "John Doe" },
  },
  {
    comment: "Review. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni ipsa ducimus architecto explicabo id accusantium nihil exercitationem autem porro esse.",
    rating: 3,
    user: { id: new ObjectId(), name: "John Doe" },
  },
]

module.exports = reviews
