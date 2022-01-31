const style = {
  backgroundColor: "#000000",
  // borderTop: "1px solid #E7E7E7",
  textAlign: "center",
  padding: "20px",
  position: "fixed",
  left: "0",
  bottom: "0",
  height: "60px",
  width: "100%",
  color: "#fff",
};

const phantom = {
  display: "block",
  padding: "20px",
  height: "60px",
  width: "100%",
};

function Footer() {
  return (
    <div>
      <div style={phantom} />
      <div style={style}>
        <p>Copyright &copy; {new Date().getFullYear()}. All Rights Reserved</p>
      </div>
    </div>
  );
}

export default Footer;
