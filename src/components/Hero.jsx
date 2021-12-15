import Buy from "./Buy";

const Hero = ({collection}) => {
    return (
        <div className="buyContainer" style={{ border: "1px solid black"}}>
            <Buy collection={collection} />
            {/* <h1>Hero</h1> */}
        </div>
    )
}

export default Hero;