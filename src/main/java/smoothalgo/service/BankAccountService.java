package smoothalgo.service;

import smoothalgo.domain.BankAccount;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link BankAccount}.
 */
public interface BankAccountService {

    /**
     * Save a bankAccount.
     *
     * @param bankAccount the entity to save.
     * @return the persisted entity.
     */
    BankAccount save(BankAccount bankAccount);

    /**
     * Get all the bankAccounts.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<BankAccount> findAll(Pageable pageable);
    /**
     * Get all the BankAccountDTO where UserExtra is {@code null}.
     *
     * @return the list of entities.
     */
    List<BankAccount> findAllWhereUserExtraIsNull();

    /**
     * Get the "id" bankAccount.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<BankAccount> findOne(Long id);

    /**
     * Delete the "id" bankAccount.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
