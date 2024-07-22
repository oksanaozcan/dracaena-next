import Container from "@/components/ui/container";
import Link from "next/link";


const GuaranteePage = () => {
  return (
    <Container>      
      <h1>Guarantee</h1>
      <article>
        <p>
        We expect every order to arrive in tip-top shape. We take intensive care of the plants in our greenhouse and use special and as sustainable as possible protective packaging to ship our plants. We also wrote an extensive <Link className="underline font-bold" href={'#'}>blog about how to unpack and prepare your plants for growth after shipping</Link>. However there are rare occasions where our PLNTS don’t meet their full potential. That’s why all plants are guaranteed for 30 days after arrival, if still in its original nursery pot.
        </p>
        <p>
        To make your Dracaena feel at home and let them settle down perfectly, we have some simple guidelines. As plants don’t love drastic changes to their environment straight after shipping, it may take a few days or weeks for your plant to get used to its new home. Does your new green baby not recover from her journey? We offer a 30-day health guarantee if your purchase does not meet our health standards. In this case, a solution will be sought jointly and in consultation. If a plant is out of stock, we are not able to offer the same plant as a replacement. <span className="font-bold">Please note that repotting your new plant into a new nursery pot within the first 30 days will void our 30-day guarantee.</span>
        </p>
        <p className="italic">Baby plants without a nursery pot can be potted. We recommend leaving the plug to avoid damaging the roots of your plant. By removing the plug, you will damage the small roots that are essential for the plant. Don't worry, all our plugs are 100% biodegradable so they won't harm your plant or the earth!</p>
        <p>
        Was your purchase less than 30 days ago and did your plant or product arrive damaged? Take photos of your damaged item and get in touch with our customer support via our support button, e-mail or Whatsapp. Together, we will find a suitable solution. <span className="font-bold">Please note that we can’t refund after our 30-days policy and that photos are required as proof of damage.</span>
        </p>
        <p>
        Additionally, we take great care in selecting the perfect plants for our platns lovers. However, all plants are unique and can have little differences from the plant on the product page. No rights can be derived from the pictures on the product page. Please note that once an order is placed, we are not able to make adjustments or cancellations as our team begins prepping your order for shipment right away.
        </p>
        <h2>
          <Link className="underline" href={'#'}>Customer service</Link>
          <p>
          Did you order your plants more than 30 days ago? Our <Link className="underline font-bold" href={'#'}>Dracaena Doctor</Link> is here to help you with all your plant related questions! Didn’t find the answer you were looking for? Our customer service is happy to provide you with our best advice.
          </p>
        </h2>
        <h2>Dracaena Guarantee Summary</h2>
        <ul className="list-disc">
          <li>All plants are guaranteed for 30 days after arrival, if they are still in their original nursery pot;</li>
          <li>Repotting your plants into a new pot within the first 30 days will void the 30-day guarantee;</li>
          <li>BabyPLNTS without a nursery pot can be potted and will be guaranteed for 30 days after arrival;</li>
          <li>Photos of the plants are required as proof of damage;</li>
          <li>We can’t refund after our 30-days policy;</li>
          <li>We are not able to make adjustments or cancellations once an order is placed;</li>
          <li>No rights can be derived from the pictures on the product page.</li>
        </ul>
      </article>    
    </Container>
  );
}

export default GuaranteePage;