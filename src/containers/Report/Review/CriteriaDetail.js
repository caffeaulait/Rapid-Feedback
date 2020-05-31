import React from 'react';
import styles from './CriteriaDetail.module.css';

class CriteriaDetail extends React.Component {


    render() {

        let content = this.props.result.map((criteria) => {
            //let res = this.props.result.filter((r) => r.id === criteria.id)[0];
            return (

                <tr key={criteria.id} className = {styles.row}>
                    <td className={styles.box}>
                        <div className={styles.title}>
                            <span className={styles.left}>{criteria.criteria}</span>
                            <span className={styles.right}>
                                <input className={styles.nInput} type="number" max={criteria.weight} min={0} value={Number(criteria.point)} onChange={(e) => this.props.updatePoint(e.target.value, criteria.id, this.props.marker.id)} disabled={Number(this.props.marker.id) === Number(this.props.id) ? false:true}></input>{" /" + criteria.weight}
                            </span>
                        </div><br></br><br></br>
                        <div className={styles.comments}>
                            <textarea value={criteria.comment} onChange={(e) => this.props.updateComments(e.target.value, criteria.id, this.props.marker.id)} disabled={Number(this.props.marker.id) === Number(this.props.id) ? false:true} ></textarea>
                        </div>
                    </td>
                </tr>


            )
        })
        return (
            <>
                {content}
            </>
        )
    }
}

export default CriteriaDetail;