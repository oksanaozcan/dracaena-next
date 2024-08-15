import Button from "../ui/button"

export const FooterForm = () => {
  return (
    <>
    <h5 className="font-bold text-xl py-2">What's the word on the street?</h5>
    <span>Be part of our community by subscribing to our newsletters!</span>
    <form className='grid py-4'>         
      <input className="px-4 py-2 my-2" type="email" placeholder="Your email address"/>
      <Button>Surprise me!</Button>              
    </form>
    </>
  )
}