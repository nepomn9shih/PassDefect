export const getTiledProperty = (obj: Phaser.Types.Tilemaps.TiledObject, propertyName: string) => {
    for (let propertyIndex = 0; propertyIndex < obj.properties.length; propertyIndex += 1) {
        let property = obj.properties[propertyIndex];
        if (property.name === propertyName) {
            return property.value;
        }
    }
}