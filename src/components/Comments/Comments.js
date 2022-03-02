import style from './Comments.module.scss'
import Spinner from '../Spinner/Spinner'

const Comments = ({comments}) => {


  const commentsDestruct = (comments) => {
    return comments.map((comment) => {
      if (comment.hasOwnProperty('kids')) {
        return (
          <div key={comment.id}>
            <li className={style.comments__item}>{comment.text}</li>
            <ul className={style.comments__answers}>{commentsDestruct(comment.kids)}</ul>
          </div>
        );
      } else {
        return <li key={comment.id} className={style.comments__item}>{comment.text}</li>;
      }
    });
  };

  let commetsContent = comments.length ? (
    <ul className={style.comments}>{commentsDestruct(comments)}</ul>
  ) : (
    <div className={style.comments__spinner}>
      <Spinner />
    </div>
  );

  return commetsContent
}

export default Comments