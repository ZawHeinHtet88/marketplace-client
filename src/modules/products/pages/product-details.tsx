import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import BreadCrumps from "@/components/ui/breadcrumps";
import { Button } from "@/components/ui/button";
import { LucideShoppingCart } from "lucide-react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

function ProductDetailPage() {
  return (
    <section className="my-10 space-y-10">
      <BreadCrumps
        breadcrumbs={[
          { label: "Products", href: "/products" },
          { label: "Espresso Assiseno", href: "/products/43" },
        ]}
      />
      <div className="grid lg:grid-cols-2 gap-10">
        <div className="space-y-5">
          <PhotoProvider>
            <PhotoView src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAwCuiFu-SVZra21B9gmO3VbWWx4xcuX2pvg&s">
              <div className="hover:cursor-pointer">
                <img
                  className="w-full rounded-xl shadow"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAwCuiFu-SVZra21B9gmO3VbWWx4xcuX2pvg&s"
                  alt=""
                />
              </div>
            </PhotoView>
            <div className="grid grid-cols-4 gap-5">
              <PhotoView src="https://img.freepik.com/premium-photo/tasty-steaming-espresso-cup-with-coffee-beans-closeup_1220-6365.jpg?w=1380">
                <div className="hover:cursor-pointer">
                  <img
                    className="w-full rounded-xl shadow"
                    src="https://img.freepik.com/premium-photo/tasty-steaming-espresso-cup-with-coffee-beans-closeup_1220-6365.jpg?w=1380"
                    alt=""
                  />
                </div>
              </PhotoView>
            </div>
          </PhotoProvider>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src="../login_image.jpg" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <h6 className="text-sm font-bold text-foreground">
                  Su Nay Chi
                </h6>
              </div>
            </div>
            <Button className="text-primary" variant={"outline"}>
              <LucideShoppingCart />
              Add To Cart
            </Button>
          </div>
          <h5 className="text-2xl font-bold text-primary">
            Expresso Cup with demo data
          </h5>
          <div className="flex gap-3">
            <Badge>Coffe Cup</Badge>
            <Badge className="bg-green-600">In Stock : 5</Badge>
          </div>
          <div>
            <h6 className="text-lg text-foreground/80 font-bold mb-3">
              Description
            </h6>
            <div className="h-[400px] overflow-hidden overflow-y-scroll">
              <p className="text-foreground/80">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam
                quod deserunt iusto quas. Maxime ipsam id nesciunt voluptates
                fugit aliquam maiores sunt, dignissimos perspiciatis! Facilis
                tempore sed iure exercitationem repudiandae! Lorem ipsum dolor
                sit amet consectetur, adipisicing elit. Magni iste illum
                distinctio ullam. Distinctio quaerat quidem vel, repellat natus
                exercitationem illo mollitia fuga rem non veritatis ipsum nam
                provident asperiores! Cupiditate eum, quidem architecto est
                perferendis expedita adipisci. Ullam quas, totam facere placeat,
                ab ea esse deleniti hic dolore quo modi? Cupiditate obcaecati
                perferendis hic numquam totam ipsa velit ullam. Eaque magnam
                quae accusantium accusamus vitae, placeat ratione officiis
                numquam, expedita ipsa atque rem qui laborum provident libero
                dolore, assumenda ut quis? Quasi adipisci dolor repellendus
                maxime. Quia, optio at. Illum quasi culpa enim? Eligendi
                voluptatibus provident unde sit vero aperiam reprehenderit
                possimus cumque ipsa! Quos assumenda maxime sit minus modi
                mollitia officiis hic iusto, nemo, quod omnis voluptatum
                voluptate! Ipsum, sit excepturi aperiam sunt optio laborum ex
                unde sed ab eum necessitatibus repellat, nulla accusamus nam, a
                dolor. Soluta odit ratione temporibus necessitatibus
                exercitationem blanditiis tempore? Necessitatibus, iusto error.
                Animi et aliquam impedit illo libero veritatis rem, repudiandae
                delectus id repellat ut, commodi quos quidem ducimus ea
                molestias velit? Veniam similique debitis aliquam consectetur
                fuga. Accusamus ipsa quo aut. Pariatur ab voluptates atque
                fugiat ullam repellat voluptatum perspiciatis! Quaerat nobis
                blanditiis exercitationem amet consequatur dolor, iure, maxime
                maiores natus nihil nisi excepturi ipsam ipsa aliquam dicta
                quisquam doloribus accusantium? Asperiores dolorum alias odit
                ratione voluptate doloremque, veritatis numquam molestias
                repellat expedita. Dolores at, sit omnis nemo provident alias?
                Quia natus harum est, cupiditate quam consequatur cumque qui
                consectetur cum. Odit, dignissimos iusto? Dolorum, error! Modi
                nobis repudiandae provident aut? Sapiente labore culpa
                consectetur deserunt nemo aliquam tenetur vitae architecto
                doloremque. Sed eveniet molestias repudiandae, ullam modi nobis
                similique quas. Error fuga quas quis? Quos asperiores reiciendis
                ipsa quibusdam, ullam mollitia aliquam voluptatem tenetur vitae
                totam a nemo optio repellat cupiditate aut delectus quod
                consequuntur sed. Qui facere sapiente facilis.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h6 className="text-xl text-foreground font-semibold mb-5">
          Related Products
        </h6>
        <div className="grid grid-col-2 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard /> */}
        </div>
      </div>
    </section>
  );
}

export default ProductDetailPage;
