import { useSelector } from 'react-redux';
import style from './Comments.module.scss'
import Spinner from '../Spinner/Spinner'

const Comments = ({comments}) => {
  const {isLoading} = useSelector(state => state.loading)

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
        return <li dangerouslySetInnerHTML={{ __html: comment.text }} key={comment.id} className={style.comments__item}></li>;
      }
    });
  };

  let commetsContent = !isLoading ? (
    <ul className={style.comments}>{commentsDestruct(comments)}</ul>
  ) : (
      <Spinner />
  );

  return commetsContent
}

export default Comments