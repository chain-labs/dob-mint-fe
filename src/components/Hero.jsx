import Buy from "./Buy";

const Hero = ({collection}) => {
    return (
        <div className="buyContainer">
            <Buy collection={collection} />
        </div>
    )
}

export default Hero;