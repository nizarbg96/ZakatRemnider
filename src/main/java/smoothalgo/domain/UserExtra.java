package smoothalgo.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A UserExtra.
 */
@Entity
@Table(name = "user_extra")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class UserExtra implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(unique = true)
    private BankAccount bankAccount;

    @OneToMany(mappedBy = "userExtra")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Period> periods = new HashSet<>();

    @OneToMany(mappedBy = "userExtra")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Zakat> zakats = new HashSet<>();

    @OneToMany(mappedBy = "userExtra")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Beneficiary> beneficiarys = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BankAccount getBankAccount() {
        return bankAccount;
    }

    public UserExtra bankAccount(BankAccount bankAccount) {
        this.bankAccount = bankAccount;
        return this;
    }

    public void setBankAccount(BankAccount bankAccount) {
        this.bankAccount = bankAccount;
    }

    public Set<Period> getPeriods() {
        return periods;
    }

    public UserExtra periods(Set<Period> periods) {
        this.periods = periods;
        return this;
    }

    public UserExtra addPeriods(Period period) {
        this.periods.add(period);
        period.setUserExtra(this);
        return this;
    }

    public UserExtra removePeriods(Period period) {
        this.periods.remove(period);
        period.setUserExtra(null);
        return this;
    }

    public void setPeriods(Set<Period> periods) {
        this.periods = periods;
    }

    public Set<Zakat> getZakats() {
        return zakats;
    }

    public UserExtra zakats(Set<Zakat> zakats) {
        this.zakats = zakats;
        return this;
    }

    public UserExtra addZakats(Zakat zakat) {
        this.zakats.add(zakat);
        zakat.setUserExtra(this);
        return this;
    }

    public UserExtra removeZakats(Zakat zakat) {
        this.zakats.remove(zakat);
        zakat.setUserExtra(null);
        return this;
    }

    public void setZakats(Set<Zakat> zakats) {
        this.zakats = zakats;
    }

    public Set<Beneficiary> getBeneficiarys() {
        return beneficiarys;
    }

    public UserExtra beneficiarys(Set<Beneficiary> beneficiaries) {
        this.beneficiarys = beneficiaries;
        return this;
    }

    public UserExtra addBeneficiarys(Beneficiary beneficiary) {
        this.beneficiarys.add(beneficiary);
        beneficiary.setUserExtra(this);
        return this;
    }

    public UserExtra removeBeneficiarys(Beneficiary beneficiary) {
        this.beneficiarys.remove(beneficiary);
        beneficiary.setUserExtra(null);
        return this;
    }

    public void setBeneficiarys(Set<Beneficiary> beneficiaries) {
        this.beneficiarys = beneficiaries;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UserExtra)) {
            return false;
        }
        return id != null && id.equals(((UserExtra) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "UserExtra{" +
            "id=" + getId() +
            "}";
    }
}
