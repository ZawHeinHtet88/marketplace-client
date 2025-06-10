import OrderCard from "../component/order-card";

function OrderListPage() {
  return (
    <section className="max-w-4xl mx-auto my-10">
      <header className="mb-5">
        <h5 className="text-2xl text-primary font-bold">My Orders</h5>
      </header>
      <div className="shadow-lg rounded-2xl w-full h-[700px] overflow-hidden overflow-y-scroll">
       <OrderCard/>
       <OrderCard/>
       <OrderCard/>
       <OrderCard/>
       <OrderCard/>
       <OrderCard/>
      </div>
    </section>
  );
}

export default OrderListPage;
