import React from 'react'
import { Redirect } from "react-router-dom";
import { useMutation } from '@apollo/client';
import {
    Button, Form, Input, Layout, Typography
} from "antd";
import { displayErrorMessage, displaySuccessNotification } from '../../utils';
import { CREATE_SUPERHERO } from '../../graphql/mutation';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";

const { Content } = Layout;
const { Text, Title } = Typography;

export const CreateSuperhero = () => {
    const [form] = Form.useForm();
    const history = useHistory();
    console.log("🔥🚀 ===> CreateSuperhero ===> history", history);

    const [createSuperhero, { loading, data }] = useMutation
        (CREATE_SUPERHERO, {
            onCompleted: () => {
                displaySuccessNotification("You've successfully created your Superhero!");
            },
            onError: () => {
                displayErrorMessage(
                    "Sorry! We weren't able to create your Superhero. Please try again later"
                );
            },
        });


    const validateMessages = {
        required: 'Please complete all required form fields!',
    };

    const handleHostListing = (values: any) => {
        const input = {
            ...values,
        };

        createSuperhero({
            variables: {
                input,
            },
        });
    };


    if (loading) {
        return (
            <Content className="load-content">
                <div className="load-header">
                    <Title level={3} className="load-title">
                        Please wait!
                    </Title>
                    <Text type="secondary">We're creating your Superhero now.</Text>
                </div>
            </Content>
        );
    }

    if (data && data.createSuperhero) {
        return <Redirect to={`/superhero/${data.createSuperhero.id}`} />;
    }

    const goBack = () => {
        let path = `/`;
        history.push(path);
    }

    return (
        <div className='container__createEditHero'>

            <ArrowLeftOutlined className='ArrowLeftOutlined' style={{ fontSize: 30 }} onClick={goBack} />
            <Content className="load-content">
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleHostListing}
                    validateMessages={validateMessages}
                >
                    <div className="load-header">
                        <Title level={3} className="load-title">
                            Hi! Let's create our own Superhero!
                        </Title>
                        <Text type="secondary">
                            How do you see him?
                        </Text>
                    </div>

                    <Form.Item
                        label="Nickname"
                        name="nickname"
                        extra="Max character count of 15"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter a Nickname for your Superhero!',
                            },
                        ]}
                    >
                        <Input
                            maxLength={15}
                            placeholder="Superman"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Real Name"
                        name="real_name"
                        extra="Max character count of 15"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter a real name for your Superhero!',
                            },
                        ]}
                    >
                        <Input
                            maxLength={15}
                            placeholder="Clark Kent"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Origin deescription"
                        name="origin_description"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter a origin deescription for your Superhero!',
                            },
                        ]}
                    >
                        <Input.TextArea
                            rows={4}
                            placeholder="he was born Kal-El on the planet Krypton, before being rocketed to
                        Earth as an infant by his scientist father Jor-El, moments before Krypton's destruction..."
                        />
                    </Form.Item>

                    <Form.Item
                        label="Superpowers"
                        name="superpowers"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter a superpowers for your Superhero!',
                            },
                        ]}
                    >
                        <Input.TextArea
                            rows={3}
                            placeholder="​solar energy absorption and healing factor, solar flare and heat vision, solar invulnerability, flight..." />
                    </Form.Item>

                    <Form.Item
                        label="Catch phrase"
                        name="catch_phrase"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter a catch phrase for your Superhero!',
                            },
                        ]}
                    >
                        <Input.TextArea
                            rows={3}
                            placeholder="Look, up in the sky, it's a bird, it's a plane, it's Superman!" />
                    </Form.Item>

                    <Form.Item
                        label="Image"
                        name="images"
                        extra="Images have to be https://photos..."
                        rules={[
                            {
                                required: true,
                                message: 'Please provide an image for your Superhero!',
                            },
                        ]}
                    >
                        <Input
                            placeholder="https://photos..." />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Content >
        </div>
    )
}
