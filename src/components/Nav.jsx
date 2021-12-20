import "../style/style.scss"

const Nav = ({connectedAddress, network}) => {
  return ( 
    <div className="navBox pt-3 pb-3" style={{borderBottom:"2px solid #eaeaea",display: "flex", justifyContent: "flex-end"}}>
      <div>
        <a className="navLink m-3" href="https://daughtersofblockchain.com/">HOME</a>
        <a className="navLink m-3" href="https://daughtersofblockchain.com/swag">SWAG SHOP</a>
        <a className="navLink m-3" href="https://daughtersofblockchain.com/license">LICENSE</a>
        <a className="navLink m-3" href="https://daughtersofblockchain.com/press-kit">PRESS KIT</a>

      </div>
    </div>
  );
};

export default Nav;
