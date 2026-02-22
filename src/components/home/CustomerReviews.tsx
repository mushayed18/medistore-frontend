import Image from "next/image"
import { IoChatbubbleOutline } from "react-icons/io5"

interface Review {
  name: string
  image: string
  text: string
}

const reviews: Review[] = [
  {
    name: "Olivia Garcia",
    image: "https://images.pexels.com/photos/30873846/pexels-photo-30873846.jpeg",
    text: "B12 Medicine keeps me energized and focused all day. A true lifesaver for vitality and wellness!",
  },
  {
    name: "Sophia Brown",
    image: "https://images.pexels.com/photos/60778/pexels-photo-60778.jpeg",
    text: "I've regained my energy and feel amazing thanks to B12 Medicine. Highly recommend for health and stamina!",
  },
  {
    name: "Ethan Harris",
    image: "https://images.pexels.com/photos/30316397/pexels-photo-30316397.jpeg",
    text: "As a vegetarian, B12 Medicine keeps my energy up and my health on track. Perfect for natural support!",
  },
]

export default function CustomerReviews() {
  return (
    <section className="px-6 py-16 md:px-12 lg:px-20 lg:py-20">
      <h2 className="mb-10 text-center font-serif text-3xl text-primary md:mb-14 md:text-4xl">
        Customers review
      </h2>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map(({ name, image, text }) => (
          <div
            key={name}
            className="flex flex-col justify-between rounded-xl p-6 border-2 border-primary/20 shadow-sm"
          >
            <div>
              <IoChatbubbleOutline className="mb-4 h-5 w-5 text-primary/60" />
              <p className="text-sm leading-relaxed text-primary/70">
                {text}
              </p>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <Image
                src={image}
                alt={name}
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-cover"
              />
              <span className="text-sm font-medium text-primary">
                {name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
