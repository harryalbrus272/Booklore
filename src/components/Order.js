import React from 'react';

const Order = (props) => {
  console.log(props);
  return (
    <div className="book-info-container">
      <div className="image-container">
        <img
          height="150"
          src="https://images-na.ssl-images-amazon.com/images/I/51wOOMQ+F3L._SX312_BO1,204,203,200_.jpg"
          alt="book"
        />
      </div>
      <div className="info-container">
        <h4 style={{ fontSize: '20px', margin: '0' }}>Rich Dad, Poor Dad</h4>
        <h6 style={{ fontSize: '15px', margin: '0' }}>Robert Kiyosaki</h6>
        <p className="price">Rs. 101</p>
        <button>Order Now</button>
      </div>
      <div className="description-container">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure ratione
          dolore commodi distinctio delectus quisquam reprehenderit maiores
          recusandae corrupti, voluptatem repellendus illo nihil magnam fuga
          autem a ipsum eligendi corporis. Lorem ipsum, dolor sit amet
          consectetur adipisicing elit. In quis, est quas quidem ipsum rerum
          facere reprehenderit dignissimos provident, nam eveniet dicta eius?
          Impedit voluptatem nihil ipsam, nobis sunt dolores.
        </p>
      </div>
    </div>
  );
};

export default Order;
