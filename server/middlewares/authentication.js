// import jwt  from "jsonwebtoken";
// const authentication = async (req, res, next) =>{
//     try {
//         const token = req.headers.authorization.split(' ')[1];
//         if(token){
//             let decodedData = jwt.verify(token, "1234");
//             req.userId = decodedData?.id;
//         }
//         next()
//     } catch (error) {
//         console.log(error);

//     }
// }
// export default authentication;


import jwt from "jsonwebtoken";

const authentication = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        console.log(token);
        if (token) {
            const decodedData = jwt.verify(token, "1234"); // Replace with your actual secret key
            req.userId = decodedData?.id;
        }
        next();
    } catch (error) {
        console.log(error);
        // Handle the error, e.g., return a 401 Unauthorized response
        res.status(401).json({ message: 'Unauthorized' });
    }
};

export default authentication;