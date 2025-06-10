function OrderCard() {
  return (
    <div className="rounded-t-2xl p-5 flex justify-between items-center border-b ">
      <div className="">
        <div className="mb-4">
          <h4 className="text-primary text-lg font-semibold">Order#32343243</h4>
          <p className="font-semibold text-foreground/50">20Dec-2022,3:00p.m</p>
        </div>
        {/* <p className="text-green-600 font-semibold text-sm">Estimated Delviery on 21 Dec</p> */}
        <p className="text-orange-600 font-semibold text-sm">
          Delivered on 21 Dev
        </p>
      </div>
      <div>
        <img
          className="w-[100px] h-[100px] rounded-2xl"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTX4sPl8qfzRC7uZqlCP89rszr0mNCJaVUow&s"
          alt=""
        />
      </div>
    </div>
  );
}

export default OrderCard;
