require("dotenv/config")
require("express-async-errors")

const AppError = require("./utils/AppError");
const uploadConfig = require ("./configs/upload");
const cors = require("cors");
const express = require("express")
const routes = require("./routes");
const cookieParser = require("cookie-parser")


const app = express();
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:5173","http://127.0.0.1:5173"],
    credentials:true
}));

app.use(express.json());

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));

app.use(routes);



app.use((error,request,response,next) => {
    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            status:"error",
            message:error.message
        })
    }

    return response.status(500).json({
        status: "error",
        message:"Internal server error",
    })
})




const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`))


