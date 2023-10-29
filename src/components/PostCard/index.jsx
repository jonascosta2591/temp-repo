import './styles.css'

export const PostCard = ({key, title, body, id, cover}) => {
  return (
    <div key={key} className="post-content">
      <img src={cover} alt="img"/>
      <div className="post-card-content">
        <h1>{title}</h1>
        <p>{body}</p>
      </div>
    </div>
  )
}