import React from "react";
import { Link } from "react-router-dom";
import { Card, Typography } from "antd";

interface Props {
    superhero: {
        id: string;
        nickname: string;
        real_name: string;
        origin_description: string;
        superpowers: string;
        catch_phrase: string;
        images: string;
    };
}

const { Title } = Typography;

export const SuperheroCard = ({ superhero }: Props) => {
    const { id, nickname, images } = superhero;

    return (
        <Link to={`/superhero/${id}`}>
            <Card
                hoverable
                cover={
                    <div
                        style={{ backgroundImage: `url(${images})` }}
                        className="superhero-card__cover-img"
                    />
                }
            >
                <Title level={3} className="superhero-card__title">
                    <span>{nickname}</span>
                </Title>
            </Card>
        </Link>
    );
};
