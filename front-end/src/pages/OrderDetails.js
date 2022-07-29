import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
   const { id } = useParams();
   const [shit, setShit] = useState(".");
   useEffect(() => {
      const shity = async () => {
         //fix cors error
         const res = await fetch("https://www.google.com/", {});
         console.log(res);
         const data = await res.text();
         console.log(data);
         setShit(data);
      };
      shity();
   });
   return (
      <>
         <div>OrderDetails</div>
         <code>{shit}</code>
      </>
   );
};

export default OrderDetails;
