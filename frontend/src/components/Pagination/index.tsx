import { ReactComponent as ArrowIcon } from 'assets/images/arrow.svg';
import ReactPaginate from 'react-paginate';
import './styles.css';

type Props = {
    pageCount: number;
    range: number;
}

const Pagination = ({ pageCount, range }: Props) => {
    return (

        <ReactPaginate
            pageCount={pageCount}
            pageRangeDisplayed={range}
            marginPagesDisplayed={1}
            containerClassName="pagination-container"
            pageLinkClassName='pagination-item'
            breakClassName='pagination-item'
            previousClassName="arrow-previous"
            nextClassName="arrow-next"
            activeLinkClassName="pagination-link-active"
            disabledClassName="arrow-inactive"
            previousLabel={<ArrowIcon />}
            nextLabel={<ArrowIcon />}
        />
    );
};

export default Pagination;