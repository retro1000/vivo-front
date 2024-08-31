import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import Typography from '@mui/material/Typography';
import { useFormatter } from 'app/hooks/useFormatter';

import {
    HourglassBottom,
    LocalShipping,
    AirplanemodeActive,
    PhoneMissed,
    Replay,
    Check,
    Clear,
    Flag,
    CallReceived,
    ThumbUpAlt,
    AssignmentTurnedIn,
    DeleteForever,
    CancelPresentation,
    ErrorOutline

} from '@mui/icons-material'
import { useEffect } from 'react';
import { useState } from 'react';
import { useAxios } from 'app/hooks/useAxios';

const getIcon = (status) => {
    switch(status){
        case 'PENDING':
            return <HourglassBottom sx={{color: '#FFA500', fontSize: '40px'}} />  // Orange for pending tasks
        case 'SHIPPED':
            return <LocalShipping sx={{color: '#008000', fontSize: '40px'}} />  // Green for shipped items
        case 'NEED_TO_IMPORT':
            return <AirplanemodeActive sx={{color: '#1E90FF', fontSize: '40px'}} />  // Dodger blue for items needing import
        case 'STOCK_AVAILABLE':
            return <ThumbUpAlt sx={{color: '#32CD32', fontSize: '40px'}}/>  // Lime green for available stock
        case 'NO_ANSWER':
            return <PhoneMissed  sx={{color: '#FF4500', fontSize: '40px'}}/>  // Orange-red for no answer
        case 'RESCSHEDULE':
        case 'DELIVERY_RESCSHEDULE':
            return <Replay  sx={{color: '#FFD700', fontSize: '40px'}}/>  // Gold for rescheduled items
        case 'COMPLETED':
            return <Check sx={{color: '#008000', fontSize: '40px'}}/>  // Green for completed tasks
        case 'CANCELED':
        case 'DELIVERY_CANCELED':
            return <Clear sx={{color: '#FF0000', fontSize: '40px'}}/>  // Red for canceled items
        case 'RETURN':
            return <CallReceived  sx={{color: '#FF6347', fontSize: '40px'}}/>  // Tomato red for returns
        case 'CREATED':
            return <Flag  sx={{color: '#00BFFF', fontSize: '40px'}}/>  // Deep sky blue for created items
        case 'CONFIRMED':
            return <AssignmentTurnedIn  sx={{color: '#32CD32', fontSize: '40px'}}/>  // Lime green for confirmed tasks
        case 'ITEM_LOST':
            return <ErrorOutline  sx={{color: '#FF4500', fontSize: '40px'}}/>  // Orange-red for lost items
        default:
            return <LaptopMacIcon sx={{color: '#808080', fontSize: '40px'}} />  // Gray for default/unknown statuses
    }
    
}

export default function TimeLine({ path }) {

    const { DefaultDateTimeFormat, DefaultWordFormat } = useFormatter()

    const { api } = useAxios()

    const [timeLines, setTimeLines] = useState([
        {user: 'damitha', status: 'CANCELED', time: '2024-01-02T09:24:00', note: 'Order canceled.'},
        {user: 'damitha', status: 'PENDING', time: '2024-03-02T09:24:56', note: 'Order pending.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.'},
        {user: 'damitha', status: 'CONFIRMED', time: '2024-03-02T09:24:56', note: 'Order confirmed.'},
        {user: 'damitha', status: 'COMPLETED', time: '2024-01-02T09:21:00', note: 'Order completed.'},
        {user: 'damitha', status: 'NEED_TO_IMPORT', time: '2024-01-02T09:09:45', note: 'Need to import items.'},
        {user: 'damitha', status: 'NEED_TO_IMPORT', time: '2024-01-02T09:09:45', note: 'Need to import items.'},
        {user: 'damitha', status: 'STOCK_AVAILABLE', time: '2024-01-02T09:09:45', note: 'Stock available.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.'},
        {user: 'damitha', status: 'NO_ANSWER', time: '2024-01-02T09:09:45', note: 'No answer received.'},
        {user: 'damitha', status: 'DELIVERY_RESCSHEDULE', time: '2024-01-02T09:09:45', note: 'Delivery rescheduled.'},
        {user: 'damitha', status: 'RESCSHEDULE', time: '2024-01-02T09:09:45', note: 'Rescheduled.'},
        {user: 'damitha', status: 'RETURN', time: '2024-01-02T09:09:45', note: 'Order returned.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.order create.'},
        {user: 'damitha', status: 'CREATED', time: '2024-01-02T09:09:45', note: 'Order created.'},
        {user: 'damitha', status: 'ITEM_LOST', time: '2024-01-02T09:09:45', note: 'Item lost.'},
        {user: 'damitha', status: 'SHIPPED', time: '2024-01-02T09:09:45', note: 'Order shipped.'},
      ])

      

    useEffect(() => {

        const getTimeLines = async (path) => {
            await api.get(path)
                .then(response => {
                    if(response.status===200){
                        setTimeLines(...response.data)
                    }
                })
                .catch(error => {})
                .finally(() => {})
        }

        getTimeLines(path)
    }, [])

    return timeLines && timeLines.length>0 ? (
        <Timeline position="alternate">
            {
                timeLines.map((item, index) => (
                    <TimelineItem key={index}>
                        <TimelineOppositeContent
                            sx={{ m: 'auto 0', position: 'relative', top: index===0?0:26 }}
                            align={index%2===0?"right":""}
                            variant="body2"
                            color="text.secondary"
                        >
                            {DefaultDateTimeFormat(new Date(item.time))}
                            <Typography variant='body2'>{item.user}</Typography>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineConnector sx={{height:index===0?'0':'50px'}}/>
                                <TimelineDot sx={{background: '#f0f1f2', width: '50px', height: '50px'}}>
                                    {getIcon(item.status)}
                                </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent sx={{ py: '12px', px: 2, position: 'relative', top: ((index===0?0:47) + (item.note?0:13)) }}>
                            <Typography variant="h6" component="span">
                                {DefaultWordFormat(item.status)}
                            </Typography>
                            {item.note && <Typography variant='body2'>{item.note}</Typography>}
                        </TimelineContent>
                    </TimelineItem>
                ))
            }
        </Timeline>
    ) : '';
}