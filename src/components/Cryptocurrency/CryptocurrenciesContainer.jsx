import { Row } from "antd";
import { CryptocurrenciesCard, EmptyResults } from "../";

const CryptocurrenciesContainer = ({ data, visible, filterBy }) => {
    return (
        <Row gutter={[24, 24]} className="crypto-card-container">
            {data?.length >= 2 ? (
                data
                    ?.slice(0, visible)
                    .map(currency => (
                        <CryptocurrenciesCard
                            currency={currency}
                            key={currency.id}
                            filterBy={filterBy}
                        />
                    ))
            ) : (
                <EmptyResults />
            )}
        </Row>
    );
};

export default CryptocurrenciesContainer;
