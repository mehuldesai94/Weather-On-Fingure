import { Dimmer, Image, Loader, Segment } from "semantic-ui-react"

const ReactLoader = () => (
    <div>
        <Segment>
            <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
            <Dimmer active>
                <Loader size='medium'>Loading</Loader>
            </Dimmer>

        </Segment>
    </div>
)

export default ReactLoader;