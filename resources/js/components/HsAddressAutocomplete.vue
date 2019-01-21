<template>
  <div>
    <div class="form-group">
      <div class="row">
        <div class="col">
          <label for="street">Street</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <div class="input-group-text"><i class="fas fa-map-marker-alt"></i></div>
            </div>
            <input ref="autocomplete" type="text" name="street" id="street" class="form-control" onfocus="value = ''" :value="address.street">
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12 col-md-8">
        <div class="form-group">
          <label for="city">City</label>
          <input type="text" name="" id="city" class="form-control" :value="address.city">
        </div>
      </div>
      <div class="col-sm-6 col-md-2">
        <div class="form-group">
          <label for="state">State</label>
          <input type="text" name="" id="state" class="form-control" :value="address.state">
        </div>
      </div>
      <div class="col-sm-6 col-md-2">
        <div class="form-group">
          <label for="zip">Zip</label>
          <input type="text" name="" id="zip" class="form-control" :value="address.zip">
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  computed: {
    address: {
      get() {
        return this.$store.state.personalData.address;  
      },
      set(value) {
        let street = value.name;
        let city = (this.getAddressPart(value, 'locality') === undefined) ? this.getAddressPart(value, 'administrative_area_level_2') : this.getAddressPart(value, 'locality');
        let state = this.getAddressPart(value, 'administrative_area_level_1'); 
        let zip = this.getAddressPart(value, 'postal_code');
        this.$store.commit('SET_PERSONAL_DATA_ADDRESS_STREET', street);
        this.$store.commit('SET_PERSONAL_DATA_ADDRESS_CITY', city);
        this.$store.commit('SET_PERSONAL_DATA_ADDRESS_STATE', state);
        this.$store.commit('SET_PERSONAL_DATA_ADDRESS_ZIP', zip);
      }
    }
  },
  methods: {
    getAddressPart(address, part, shortName = true) {
      let addr = (address !== undefined) ? address.address_components.find(a => a.types.includes(part)) : undefined;
      if (addr === undefined) {
        return undefined;
      } else {
        return (shortName) ? addr.short_name : addr.long_name;
      }
    }
  },
  mounted() {
    this.autocomplete = new google.maps.places.Autocomplete(
      (this.$refs.autocomplete),
      {types: ['geocode']}
    );
    this.autocomplete.addListener('place_changed', () => {
      this.address = this.autocomplete.getPlace();    
    });
  }
}
</script>