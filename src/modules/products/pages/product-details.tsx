import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import BreadCrumps from "@/components/ui/breadcrumps";
import { Button } from "@/components/ui/button";
import { LucideShoppingCart } from "lucide-react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { useGetProductQuery } from "../hooks/queries";
import { useParams } from "react-router-dom";
import { useCartStore } from "@/modules/cart/store/index.store";
import ProductCard from "../components/ui/product-card";

function ProductDetailPage() {

  const {addToCart} = useCartStore(state=>state)

  const { id } = useParams<{ id: string }>();
  
  const { data: productData, isLoading } = useGetProductQuery(id || "");

  const product = productData?.product;

   const item = {
    _id: product?.id ?? "",
    title: product?.name ?? "",
    category: product?.category.name ?? "",
    price: typeof product?.price === "number" ? product.price : Number(product?.price) || 0,
    img: product?.images[0] ?? ""
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <section className="my-10 space-y-10">
      <BreadCrumps
        breadcrumbs={[
          { label: "Products", href: "/products" },
          { label:product?.name || "", href: `/products/${product?.id}` },
        ]}
      />
      <div className="grid lg:grid-cols-2 gap-10">
        <div className="space-y-5">
          <PhotoProvider>
            <PhotoView src={product?.images[0]}>
              <div className="hover:cursor-pointer">
                <img
                  className="w-full rounded-xl shadow"
                  src={product?.images[0]}
                  alt=""
                />
              </div>
            </PhotoView>
            <div className="grid grid-cols-4 gap-5">
              {product?.images.slice(1, 5).map((image, index) => (
                <PhotoView src={image} key={index}>
                  <div className="hover:cursor-pointer">
                    <img
                      className="w-full rounded-xl shadow"
                      src={image}
                      alt=""
                    />
                  </div>
                </PhotoView>
              ))}
            </div>
          </PhotoProvider>
        </div>
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={product?.merchant.logo} alt="@shadcn" />
                <AvatarFallback className="text-foreground">CN</AvatarFallback>
              </Avatar>
              <div>
                <h6 className="text-sm font-bold text-foreground">
                  {product?.merchant.name}
                </h6>
              </div>
            </div>
            <Button onClick={()=> addToCart(item)} className="text-primary" variant={"outline"}>
              <LucideShoppingCart />
              Add To Cart
            </Button>
          </div>
          <h5 className="text-2xl font-bold text-primary">
            {product?.name || "Coffe Cup"}
          </h5>
          <div className="flex gap-3">
            <Badge>{product?.category.name}</Badge>
            <Badge className="bg-green-600">
              In Stock : {product?.inventory}
            </Badge>
          </div>
          <div className="text-foreground" dangerouslySetInnerHTML={{ __html: product!.body }}></div>

          <div>
            <h6 className="text-lg text-foreground/80 font-bold mb-3">
              Description
            </h6>
            <div>
              <p className="text-foreground/80">{product?.description}</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h6 className="text-xl text-foreground font-semibold mb-5">
          Related Products
        </h6>
        <div className="grid grid-col-2 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {product?.relatedProducts.map(product=><ProductCard product={product}/>)}
          {/* <ProductCard />
          <ProductCard />
          <ProductCard />
          // <ProductCard /> */}
        </div>
      </div>
    </section>
  );
}

export default ProductDetailPage;
