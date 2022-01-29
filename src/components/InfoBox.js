import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core'
import millify from 'millify'
import './infobox.css'

const InfoBox = ({ active, isRed, title, cases, total, ...props }) => {
    return (
        <Card className={`infoBox ${active && 'infoBox--selected'} ${isRed && 'infoBox--red'}`} onClick={props.onClick}>
            <CardContent>
                <Typography variant='subtitle1' className='infobox__title' color='textSecondary'>
                    {title}
                </Typography>

                <h2 className={`infoBox__cases ${!isRed && 'infoBox__cases--green'}`}>{cases ? `+${millify(cases)}` : '+0'}</h2>
                {/* <h2 className='infoBox__cases'>{cases && cases}</h2> */}
                <Typography className='infoBox__total' color='textSecondary'>
                    Total: {total && millify(total)}
                </Typography>

            </CardContent>
        </Card>
    )
};

export default InfoBox;
