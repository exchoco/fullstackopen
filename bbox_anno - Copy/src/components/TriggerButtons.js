import React, {useState} from "react";
import { Button, Dimmer, Loader, Segment } from "semantic-ui-react";

const TriggerButtons = ({}) => {
    const [loading, setLoading] = useState(false)
    const handleRemeasureClick = async () => {
        setLoading(true);
        try{
            await new Promise(resolve => setTimeout(resolve, 2000))
            console.log("remeasure API called successfully")
        } catch (error) {
            console.error('error calling remeasure API: ', error)
        } finally {
            setLoading(false)
        }
    }
    const handleRecontourClick = async () => {
        setLoading(true)
        try{
            await new Promise(resolve => setTimeout(resolve, 2000))
            console.log("recontour API called successfully")
        } catch (error) {
            console.error('error calling recontour API: ', error)
        } finally {
            setLoading(false)
        }
    }
    return(
        <Segment raised className="lilac-background">
            <Button.Group>
                <Button 
                color="blue"
                onClick={handleRemeasureClick}
                disabled={loading}
                loading={loading}
                >Remeasure
                </Button>
                <Button.Or />
                <Button 
                color="pink"
                onClick={handleRecontourClick}
                disabled={loading}
                loading={loading}
                >Recontour
                </Button>
                <Dimmer active={loading} inverted>
                    <Loader>loading</Loader>
                </Dimmer>
            </Button.Group>
        </Segment>
    )
}
export default TriggerButtons