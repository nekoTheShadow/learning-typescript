import { Heading } from "./libs/Heading"
import { Text } from "./libs/Text"
import { Button } from "./libs/Button"
import { Textarea } from "./libs/Textarea"
import { Input } from "./libs/Input"
import { PasswordForm } from "./libs/PasswordForm"

export const App = () => {
    return (
        <>
            <Text text="true" />
            <Heading tag="h1">見出し</Heading>
            <Heading tag="h1">
                <span>hello, world!</span>
            </Heading>
            <Button onClick={()=>console.log("clicked")} title="Button" type="primary" />
            <Button onClick={()=>console.log("clicked")} title="Button" type="secondary" />
            <Button onClick={()=>console.log("clicked")} title="Button" type="error" />
            <Textarea width={200} maxLength={100} />
            <Input type="text" />
            <PasswordForm onSubmit={(password) => console.log(password)}></PasswordForm>
        </>
    )
}