import React from "react";
import { Segment, Header, List } from "semantic-ui-react";

const InformationDisplays = ({pageInformation}) => {
    return (
        <Segment raised>
            <List horizontal divided relaxed>
                {[pageInformation.map((item, index) => (
                    <List.Item key={index} as={Header} content={item.key} style={{position:'relative', top: '10px'}}>
                        <List.Content>
                            <List.Header>{item.key}</List.Header>
                            <List.Description>{item.value}</List.Description>
                        </List.Content>
                    </List.Item>
                ))]}
            </List>
        </Segment>
    )
}

export default InformationDisplays;