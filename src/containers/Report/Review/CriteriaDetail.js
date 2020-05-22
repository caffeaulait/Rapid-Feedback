import React from 'react';
import styles from './CriteriaDetail.module.css';

class CriteriaDetail extends React.Component {


    render() {

        let content = this.props.criteria.map((criteria) => {
            let res = this.props.result.filter((r) =>  r.id === criteria.id )[0];
            return (
                <div className={styles.box}>
                    <div className = {styles.title}>
                        <span className = {styles.left}>{criteria.criteria}</span>
                        <span className = {styles.right}>
                            <input className = {styles.nInput} type="number" max = {criteria.point} min = {0} value={Number(res.point)} onChange={(e) => this.props.updatePoint(e.target.value,criteria.id)}></input>{" / " + criteria.point}
                        </span>
                    </div><br></br><br></br>
                    <div className={styles.comments}>
                        <textarea value={res.comment} onChange={(e) => this.props.updateComments(e.target.value,criteria.id)}></textarea>
                    </div>
                </div>
            )
        })
        return (
            <tr>

                {content}

            </tr>
        )
    }
}

export default CriteriaDetail;