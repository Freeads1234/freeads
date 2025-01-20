const ProductCard = ({ image, title, description, price, buttonColor }) => {
    return (
        <section className="flex h-auto bg-white p-5 py-10 shadow-md hover:shadow-lg transform duration-500 hover:-translate-y-2 cursor-pointer border-2">
            <div className="w-2/5">
                <img src={image} alt={title} className="w-full h-auto object-cover" />
            </div>
            <div className="w-3/5 pl-6 flex flex-col justify-between">
                <div>
                    <div className="space-x-1 flex justify-start mt-2">
                        {[...Array(4)].map((_, index) => (
                            <svg
                                key={index}
                                className={`w-4 h-4 mx-px fill-current ${index < 3 ? 'text-orange-600' : 'text-gray-300'}`}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 14 14"
                            >
                                <path d="M6.43 12l-2.36 1.64a1 1 0 0 1-1.53-1.11l.83-2.75a1 1 0 0 0-.35-1.09L.73 6.96a1 1 0 0 1 .59-1.8l2.87-.06a1 1 0 0 0 .92-.67l.95-2.71a1 1 0 0 1 1.88 0l.95 2.71c.13.4.5.66.92.67l2.87.06a1 1 0 0 1 .59 1.8l-2.3 1.73a1 1 0 0 0-.34 1.09l.83 2.75a1 1 0 0 1-1.53 1.1L7.57 12a1 1 0 0 0-1.14 0z" />
                            </svg>
                        ))}
                    </div>
                    <h1 className="text-3xl my-5 break-words">{title}</h1>
                    <p className="mb-5">{description}</p>
                </div>
                <div>
                    <h2 className="font-semibold mb-5">${price}</h2>
                    {/* Uncomment to add button if needed */}
                    {/* <button className={`p-2 px-6 ${buttonColor} text-white rounded-md hover:bg-opacity-80`}>
                        Add To Cart
                    </button> */}
                </div>
            </div>
        </section>
    );
};

export default ProductCard;
