import CustomerReviews from "@/components/home/CustomerReviews";
import FeaturedMedicines from "@/components/home/FeaturedMedicines";
import HeroBanner from "@/components/home/HeroBanner";
import ShopByCategory from "@/components/home/ShopByCategory";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-secondary">
      <HeroBanner />  
      <ShopByCategory />
      <FeaturedMedicines />
      <CustomerReviews />
    </div>
  );
}
