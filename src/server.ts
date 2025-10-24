import app from "./app";
import {connectDB,sequelize} from './database'

const PORT = process.env.PORT || 5000;

connectDB();
sequelize.sync({alter:true}).then(()=> console.log('Tablas sincronizadas'))

app.listen(PORT, () => {
  console.log("Product Management service corriendo en http://product-management-service:5000");
});

