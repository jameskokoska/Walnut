import "./Profile.scss";

export default function Profile({ img, name, text, link, style }) {
  return (
    <div className="profile-container" style={style}>
      <a href={link} className="link">
        <div className="profile-img">
          <img src={img} alt="" />
        </div>
        <div style={{ height: "15px" }}></div>
        <div>
          <h4 style={{ textAlign: "center" }}>{name}</h4>
          <div style={{ textAlign: "center" }}>{text}</div>
        </div>
      </a>
    </div>
  );
}
